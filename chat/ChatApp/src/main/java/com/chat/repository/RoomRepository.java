package com.chat.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.chat.entites.Room;



@Repository
public interface RoomRepository extends MongoRepository<Room, String>{
	
	public Room findByRoomId(String roomId);

}
