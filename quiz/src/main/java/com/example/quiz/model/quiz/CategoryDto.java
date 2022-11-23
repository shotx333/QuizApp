package com.example.quiz.model.quiz;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link Category} entity
 */
public class CategoryDto implements Serializable {
    private final Long cid;
    private final String title;
    private final String description;

    public CategoryDto(Long cid, String title, String description) {
        this.cid = cid;
        this.title = title;
        this.description = description;
    }

    public Long getCid() {
        return cid;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryDto entity = (CategoryDto) o;
        return Objects.equals(this.cid, entity.cid) &&
                Objects.equals(this.title, entity.title) &&
                Objects.equals(this.description, entity.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cid, title, description);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "cid = " + cid + ", " +
                "title = " + title + ", " +
                "description = " + description + ")";
    }
}