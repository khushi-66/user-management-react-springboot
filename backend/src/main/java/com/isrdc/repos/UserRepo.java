package com.isrdc.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.isrdc.entities.User;

public interface UserRepo extends JpaRepository<User, Integer> {

	

}
