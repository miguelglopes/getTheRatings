package gettheratings.home.netflixWrapper.Operations;

import gettheratings.home.generalWrapper.Exceptions.CantConnectException;
import gettheratings.home.generalWrapper.Exceptions.CantParseJsonException;
import gettheratings.home.generalWrapper.Tools.Tools;
import gettheratings.home.netflixWrapper.model.Movie;

public class GetInfo{
	
	public static String BASEURL = "http://netflixroulette.net/api/api.php?";
	
	public static Movie getMovie(String title, int year){
		
		//MAKE GET REQUEST
		String response = Tools.sendGetRequest(BASEURL+"title="+title+"&year="+year);
		
		//TRY TO PARSE
		try {
			return (Movie) gettheratings.home.generalWrapper.model.Movie.map(response, Movie.class);
		} catch (CantParseJsonException e) {
			return new Movie(e);
		} catch (CantConnectException e) {
			return new Movie(e); 
		}
	}
	

}
