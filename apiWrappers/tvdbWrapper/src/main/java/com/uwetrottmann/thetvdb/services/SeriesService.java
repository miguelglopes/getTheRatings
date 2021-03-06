package com.uwetrottmann.thetvdb.services;

import com.uwetrottmann.thetvdb.TheTvdb;

import gettheratings.home.tvdbWrapper.model.SeriesEpisodes;
import gettheratings.home.tvdbWrapper.model.SeriesEpisodesSummaryWrapper;
import gettheratings.home.tvdbWrapper.model.SeriesImageQueryResults;
import gettheratings.home.tvdbWrapper.model.SeriesImagesQueryParams;
import gettheratings.home.tvdbWrapper.model.SeriesWrapper;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.HEAD;
import retrofit2.http.Header;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface SeriesService {

    /**
     * Returns a series records that contains all information known about a particular series id.
     *
     * @param id ID of the series.
     * @param language See <a href="http://en.wikipedia.org/wiki/Content_negotiation">Content negotiation</a>.
     */
    @GET("series/{id}")
    Call<SeriesWrapper> series(
            @Path("id") int id,
            @Header(TheTvdb.HEADER_ACCEPT_LANGUAGE) String language
    );

    @HEAD("series/{id}")
    Call<Void> seriesHeader(
            @Path("id") int id,
            @Header(TheTvdb.HEADER_ACCEPT_LANGUAGE) String language
    );

    /**
     * All episodes for a given series. Paginated with 100 results per page.
     *
     * @param id ID of the series.
     * @param language See <a href="http://en.wikipedia.org/wiki/Content_negotiation">Content negotiation</a>.
     * @param page Page of results to fetch. Defaults to page 1 if not provided.
     */
    @GET("series/{id}/episodes")
    Call<SeriesEpisodes> episodes(
            @Path("id") int id,
            @Query("page") Integer page,
            @Header(TheTvdb.HEADER_ACCEPT_LANGUAGE) String language
    );

    /**
     * This route allows the user to query against episodes for the given series. The response is a paginated array of
     * episode records that have been filtered down to basic information.
     *
     * @param id ID of the series.
     * @param language See <a href="http://en.wikipedia.org/wiki/Content_negotiation">Content negotiation</a>. Records
     * are returned with the Episode name and Overview in the desired language, if it exists. If there is no
     * translation
     * for the given language, then the record is still returned but with empty values for the translated fields.
     * @param page Page of results to fetch. Defaults to page 1 if not provided.
     */
    @GET("series/{id}/episodes/query")
    Call<SeriesEpisodes> episodesQuery(
            @Path("id") int id,
            @Query("absoluteNumber") Integer absoluteNumber,
            @Query("airedSeason") Integer airedSeason,
            @Query("airedEpisode") Integer airedEpisode,
            @Query("dvdSeason") Integer dvdSeason,
            @Query("dvdEpisode") Integer dvdEpisode,
            @Query("imdbId") String imdbId,
            @Query("page") Integer page,
            @Header(TheTvdb.HEADER_ACCEPT_LANGUAGE) String language
    );

    @GET("series/{id}/episodes/summary")
    Call<SeriesEpisodesSummaryWrapper> episodesSummary(
            @Path("id") int id
    );

    @GET("series/{id}/images/query")
    Call<SeriesImageQueryResults> imagesQuery(
            @Path("id") int id,
            @Query("keyType") String keyType,
            @Query("resolution") String resolution,
            @Query("subKey") String subKey,
            @Header(TheTvdb.HEADER_ACCEPT_LANGUAGE) String language
    );

    @GET("series/{id}/images/query/params")
    Call<SeriesImagesQueryParams> imagesQueryParams(
            @Path("id") int id
    );

}
