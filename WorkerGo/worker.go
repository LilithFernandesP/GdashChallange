package main

import (
	"bytes"
	"fmt"
	"log"
	"net/http"

	"github.com/rabbitmq/amqp091-go"
)

func main() {

	fmt.Println("Conectando ao RabbitMQ...")

	conn, err := amqp091.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Fatalf("Erro ao conectar: %v", err)
	}
	defer conn.Close()
	fmt.Println("Conectado!")

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Erro ao abrir canal: %v", err)
	}
	defer ch.Close()

	queueName := "Weather-queue"

	_, err = ch.QueueDeclare(
		queueName,
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Erro ao declarar fila: %v", err)
	}

	// AutoAck = false PARA conseguirmos dar ack manual
	msgs, err := ch.Consume(
		queueName,
		"",
		false, // <- autoAck false!
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Erro ao consumir: %v", err)
	}

	fmt.Println("Worker Go iniciado! Aguardando mensagens...")

	for msg := range msgs {

		fmt.Println("📥 Mensagem recebida:")
		fmt.Println(string(msg.Body))

		// ====== 1. Enviar via POST pro NestJS ======
		resp, err := http.Post(
			"http://localhost:3000/clima",
			"application/json",
			bytes.NewBuffer(msg.Body),
		)

		if err != nil {
			log.Println("❌ Erro ao enviar para API:", err)
			msg.Nack(false, true) // requeue = true
			continue
		}
		defer resp.Body.Close()

		// ====== 2. Se sucesso, dar ACK ======
		if resp.StatusCode >= 200 && resp.StatusCode < 300 {
			fmt.Println("✅ Enviado com sucesso! Dando ACK...")
			msg.Ack(false)
		} else {
			fmt.Println("❌ API retornou erro:", resp.StatusCode)
			msg.Nack(false, true)
		}
	}
}
