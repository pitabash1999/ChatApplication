package com.chat.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.entites.Room;
import com.chat.repository.RoomRepository;

@Service
public class RoomServiceImpl implements RoomService{
	
	@Autowired
	private RoomRepository roomRepository;

	@Override
	public Room getRoom(String roomId) {
	    Room room= roomRepository.findByRoomId(roomId);
	    if(room!=null)return room;
	    return null;
	}

	
	public Room save(Room room) {
		Room savedRoom=roomRepository.save(room);
		return savedRoom;
	}

	
	

}
