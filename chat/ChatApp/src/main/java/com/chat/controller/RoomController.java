package com.chat.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.entites.Message;
import com.chat.entites.Room;
import com.chat.services.RoomService;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {
	
	@Autowired
	private RoomService roomService;
	
	//create room
	
	@PostMapping
	public ResponseEntity<?> createRoom(@RequestBody String roomId) {
		
		if(roomService.getRoom(roomId)!=null) {
			return ResponseEntity.badRequest().body("Room already exist");
		}
		Room room= new Room();
		room.setRoomId(roomId);
		roomService.save(room);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(room);
		
	}
	
	//get room
	
	@GetMapping("/{roomId}")
	public ResponseEntity<?> joinRoom(@PathVariable String roomId){
		Room room=roomService.getRoom(roomId);
		if(room==null) {
			return ResponseEntity.badRequest().body("Room not found");
		}
		
		return ResponseEntity.ok(room);
	}
	
	//get messages of room
	@GetMapping("/{roomId}/message")
	public ResponseEntity<List<Message>> getMessage(@PathVariable String roomId){
		
		Room room=roomService.getRoom(roomId);
		
		List<Message> message = room.getMessages();
		
		return ResponseEntity.ok(message);
		
	}

}
