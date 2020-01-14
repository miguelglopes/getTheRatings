package gettheratings.home.omdbWrapper.Operations;

import gettheratings.home.generalWrapper.Exceptions.CantConnectException;
import gettheratings.home.generalWrapper.Exceptions.CantParseJsonException;
import gettheratings.home.generalWrapper.Tools.Tools;
import gettheratings.home.omdbWrapper.model.Movie;
import gettheratings.home.omdbWrapper.model.Series;

/**
 * Methods to get all information for an object
 * @author Miguel
 *
 */
public class GetInfo {

	public static String BASEURL = "http://www.omdbapi.com/?plot=full&r=json&tomatoes=true";

	
	/**
	 * Gets all information for a movie id
	 * @param imdbId
	 * @return
	 */
	public static Movie getMovie(String imdbId) {
		String response = Tools.sendGetRequest(BASEURL + "&i=" + imdbId);
		try {
			return (Movie) gettheratings.home.generalWrapper.model.Movie.map(response, Movie.class);
		} catch (CantParseJsonException e) {
			return new Movie(e);
		} catch (CantConnectException e) {
			return new Movie(e);
		}
	}

	/**
	 * Gets all information for a movie title+year
	 * @param imdbId
	 * @return
	 */
	public static Movie getMovie(String title, int year) {
		String response = Tools.sendGetRequest(BASEURL + "&t=" + title + "&y=" + year);
		try {
			return (Movie) gettheratings.home.generalWrapper.model.Movie.map(response, Movie.class);
		} catch (CantParseJsonException e) {
			return new Movie(e);
		} catch (CantConnectException e) {
			return new Movie(e);
		}
	}

	/**
	 * Gets all information for a series id
	 * @param imdbId
	 * @return
	 */
	public static Series getSeries(String imdbId) {
		String response = Tools.sendGetRequest(BASEURL + "&i=" + imdbId);
		try {
			return (Series) gettheratings.home.generalWrapper.model.Series.map(response, Series.class);
		} catch (CantParseJsonException e) {
			return new Series(e);
		} catch (CantConnectException e) {
			return new Series(e);
		}
	}

	/**
	 * Gets all information for a series title+year
	 * @param title
	 * @param year
	 * @return
	 */
	public static Series getSeries(String title, int year) {
		String response = Tools.sendGetRequest(BASEURL + "&t=" + title + "&y=" + year);
		try {
			return (Series) gettheratings.home.generalWrapper.model.Series.map(response, Series.class);
		} catch (CantParseJsonException e) {
			return new Series(e);
		} catch (CantConnectException e) {
			return new Series(e);
		}

	}

}
