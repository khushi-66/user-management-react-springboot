package com.isrdc.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isrdc.dtos.UserDto;
import com.isrdc.entities.User;
import com.isrdc.repos.UserRepo;

@Service
public class UserService {

	@Autowired
  private UserRepo repo;

    public void saveUser(UserDto dto) {
		User u=new User();
		BeanUtils.copyProperties(dto, u);
		  repo.save(u);
	}
	
public ArrayList<UserDto>showUser(){
	List<User>users=repo.findAll();
	ArrayList<UserDto>dtos=new ArrayList<UserDto>();
	
	for(User next:users) {
		UserDto dto=new UserDto();
		BeanUtils.copyProperties(next,dto);
		dtos.add(dto);
	}
	
	return dtos;
}


public void deleteUser(Integer id) {
	repo.deleteById(id);
}

public  UserDto findUserById(Integer id) {
	   Optional<User> u=repo.findById(id);
	   UserDto dto=new UserDto();
	   BeanUtils.copyProperties(u.get(), dto);
	
	return dto;
	
}
}


