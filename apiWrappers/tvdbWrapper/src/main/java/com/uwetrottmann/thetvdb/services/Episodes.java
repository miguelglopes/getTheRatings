package com.uwetrottmann.thetvdb.services;

import com.uwetrottmann.thetvdb.TheTvdb;

import gettheratings.home.tvdbWrapper.model.EpisodeData;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

public interface Episodes {

    @GET("episodes/{id}")
    Call<EpisodeData> get(
            @Path("id") int id,
            @Header(TheTvdb.HEADER_ACCEPT_LANGUAGE) String language
    );

}
