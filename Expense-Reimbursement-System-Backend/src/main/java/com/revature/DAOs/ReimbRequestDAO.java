package com.revature.DAOs;

import com.revature.models.ReimbRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReimbRequestDAO extends JpaRepository<ReimbRequest, Integer>{

}
