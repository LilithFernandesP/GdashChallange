package main

import (
	"fmt"
	"log"

	"github.com/rabbitmq/amqp091-go"
)

// Códigoem Go para receber as mensagens do

func main() {

	// 1. Conectar no RabbitMQ
	fmt.Println("Conectando ao RabbitMQ...")

	conn, err := amqp091.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Fatalf("Erro ao conectar: %v", err)
	}
	defer conn.Close()
	fmt.Println("Conectado!")

	// 2. Criar canal
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Erro ao abrir canal: %v", err)
	}
	defer ch.Close()

	// 3. Declarar a fila (garantir que ela existe)
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

	// 4. Consumir mensagens
	msgs, err := ch.Consume(
		queueName,
		"Weather-queue",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Erro ao consumir: %v", err)
	}

	fmt.Println("Worker Go iniciado! Aguardando mensagens...")

	// 5. Loop infinito ouvindo mensagens
	for msg := range msgs {
		fmt.Println("📥 Mensagem recebida:")
		fmt.Println(string(msg.Body))
	}
}
