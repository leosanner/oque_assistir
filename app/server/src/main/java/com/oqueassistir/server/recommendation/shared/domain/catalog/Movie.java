package com.oqueassistir.server.recommendation.shared.domain.catalog;

public record Movie(
    String id,
    String title,
    String description,
    String genre,
    String director,
    String actors,
    String rating,
    String year
) {
}
