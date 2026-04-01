package com.isrdc.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.isrdc.dtos.UserDto;
import com.isrdc.services.UserService;
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,RequestMethod.PUT})
@RestController
public class UserRestController {
	@Value("${user.dir}/src/main/resources/static/uploads/")
	private String uploadpath;
   @Autowired
   private UserService serv;
   
   //############################################  CRUD  #################################################
   
   
   
   //################################  Create  #################################
   @PostMapping("/save")
   public String saveUser(
		   @RequestParam("name") String name,
           @RequestParam("email") String email,
           @RequestParam("age") Integer age,
           @RequestParam("profession") String profession,
           @RequestParam("phone") String phone,
           @RequestParam("password") String password,
           @RequestParam("file") MultipartFile file) {
	  String filename= file.getOriginalFilename();
	  if(file.isEmpty()) {
		  System.out.println("No file selected");
	        
	  }
	  File f=new File(uploadpath);
	     if(! f.exists()) {
	    f.mkdirs();}
	     
	     Path path=Paths.get(uploadpath);
	       Path actualpath= path.resolve(filename);
	       System.out.println("path  "+actualpath);
	        try {
	        	  Files.copy(file.getInputStream(),actualpath, StandardCopyOption.REPLACE_EXISTING);
	        }catch(IOException e) {
	    		e.printStackTrace();
	    	}
	     
	   UserDto u=new UserDto();
	   u.setAge(age);
	   u.setEmail(email);
	   u.setProfession(profession);
	   u.setName(name);
	   u.setPhone(phone);
	   u.setPassword(password);
	   u.setImagepath(filename);
	   
	 serv.saveUser(u);
	   return "saved";
   }
   
   
   
   //     ############################  Read   #####################################################
	@GetMapping("/show")
   public ArrayList<UserDto> showUsers(){
	   return serv.showUser();
   }
	
	
	//############################  Update  ##############################
		@PutMapping("/update")
		public String updateUser(
				@RequestParam("id") Integer id,
				 @RequestParam("name") String name,
		           @RequestParam("email") String email,
		           @RequestParam("age") Integer age,
		           @RequestParam("profession") String profession,
		           @RequestParam("phone") String phone,
		           @RequestParam("password") String password,
		           @RequestParam("file") MultipartFile file) {
			System.out.println("parameter name : "+name);
			
			//old file deletion
			UserDto udto=serv.findUserById(id);
			String oldimagename=udto.getImagepath();
			Path oldpath=Paths.get(uploadpath,oldimagename);
			File oldfile = oldpath.toFile();
			
			if(oldfile.exists()) {
				oldfile.delete();
			}
			
			
			//new file updation.....
			 String filename= file.getOriginalFilename();
			  if(file.isEmpty()) {
				  System.out.println("No file selected");
			        
			  }
			  File f=new File(uploadpath);
			     if(! f.exists()) {
			    f.mkdirs();
			    }
			     if(!file.isEmpty()) {
			    	 
			      Path path=Paths.get(uploadpath);
			       Path actualpath= path.resolve(filename);
			       System.out.println("path  "+actualpath);
			        try {
			        	  Files.copy(file.getInputStream(),actualpath, StandardCopyOption.REPLACE_EXISTING);
			        }catch(IOException e) {
			    		e.printStackTrace();
			    	}
		}    
			
			UserDto dto=new UserDto();
			dto.setAge(age);
			dto.setEmail(email);
			dto.setPassword(password);
			dto.setPhone(phone);
			dto.setProfession(profession);
			dto.setUserId(id);
			dto.setName(name);
			dto.setImagepath(filename);
			serv.saveUser(dto);
			System.out.println(dto.toString());
			return"updated";
		}
		
		
		
	//########################################  DELETE  ##########################################
	@DeleteMapping("/delete/{id}")
	public String deleteUser(@PathVariable("id") Integer id) {
		UserDto u=serv.findUserById(id);
		String imagename=u.getImagepath();
		System.out.println("imagename : "+u.getImagepath());
		File file=new File(uploadpath+imagename);
		serv.deleteUser(id);
		if(file.exists()){
			file.delete();
			
			return "deleted";
		}
		
		return "not found";
	}
	
	
	
}


