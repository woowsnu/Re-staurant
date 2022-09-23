package com.restaurant.app.DTO;

import com.restaurant.app.model.VotedKeywords;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VotedKeywordsDTO {

    private Long keywordsIndex;

    private String keywordsCode;

    private String keywordsName;

    private Long keywordsCount;

    private String busId;

    public VotedKeywordsDTO(VotedKeywords votedKeywords) {
        this.keywordsIndex = votedKeywords.getKeywordsIndex();
        this.keywordsCode = votedKeywords.getKeywordsCode();
        this.keywordsName = votedKeywords.getKeywordsName();
        this.keywordsCount = votedKeywords.getKeywordsCount();
    }
}
