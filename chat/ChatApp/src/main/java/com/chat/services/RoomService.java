package com.chat.services;


import com.chat.entites.Room;

public interface RoomService {
	
	public Room getRoom(String roomId);
	public Room save(Room room);
}
