package com.chat.entites;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Message {
	
	private String sender;
	private String content;
	private LocalDateTime timeStamp=LocalDateTime.now();
	public Message(String sender, String content) {
		super();
		this.sender = sender;
		this.content = content;
		this.timeStamp=LocalDateTime.now();
	}
	public Message() {
		// TODO Auto-generated constructor stub
	}
	
	

}
