package com.revature.DAOs;

import com.revature.models.ReimbRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbRequestDAO extends JpaRepository<ReimbRequest, Integer>{

    //Find a list of games by their User's id
    public List<ReimbRequest> findByUser_UserId(int userId);

}
