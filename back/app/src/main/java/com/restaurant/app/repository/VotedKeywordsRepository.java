package com.restaurant.app.repository;

import com.restaurant.app.model.VotedKeywords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VotedKeywordsRepository extends JpaRepository<VotedKeywords,Long> {
}
