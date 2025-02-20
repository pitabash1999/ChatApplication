package com.chat.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.chat.entites.Message;
import com.chat.entites.Room;
import com.chat.payload.MessageRequest;
import com.chat.services.RoomService;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {
	
	@Autowired
	private RoomService roomService;
	
	@MessageMapping("/sendMessage/{roomId}")
	@SendTo("/topic/room/{roomId}")
	public Message senMessage(@DestinationVariable String roomId,@RequestBody MessageRequest request) {
		
		Room room = roomService.getRoom(roomId);
		
		Message message =new Message();
		message.setContent(request.getContent());
		message.setSender(request.getSender());
		message.setTimeStamp(LocalDateTime.now());
		
		if(room!=null) {
			room.getMessages().add(message);
			roomService.save(room);
		}
		
		return message;
	}

}
