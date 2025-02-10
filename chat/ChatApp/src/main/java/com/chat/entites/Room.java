package com.chat.entites;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "rooms")
@Data
public class Room {
	
	private String id;
	private String roomId;
	private List<Message> messages=new ArrayList<>();
	

}
