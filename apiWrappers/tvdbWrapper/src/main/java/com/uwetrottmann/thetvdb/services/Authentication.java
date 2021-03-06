package com.uwetrottmann.thetvdb.services;

import gettheratings.home.tvdbWrapper.model.LoginData;
import gettheratings.home.tvdbWrapper.model.Token;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface Authentication {

    String PATH_LOGIN = "login";

    /**
     * Returns a session token to be included in the rest of the requests. Note that API key authentication is required
     * for all subsequent requests and user auth is required for routes in the User section.
     */
    @POST(PATH_LOGIN)
    Call<Token> login(@Body LoginData loginData);

    /**
     * Refreshes your current, valid JWT token and returns a new token. Hit this route so that you do not have to post
     * to /login with your API key and credentials once you have already been authenticated.
     */
    @GET("refresh_token")
    Call<Token> refreshToken();

}
