package home;

import java.io.IOException;
import java.util.List;

import com.uwetrottmann.thetvdb.TheTvdb;

import gettheratings.home.tvdbWrapper.Operations.GetInfo;
import gettheratings.home.tvdbWrapper.model.Language;
import gettheratings.home.tvdbWrapper.model.Series;
import gettheratings.home.tvdbWrapper.model.SeriesImageQueryResults.SeriesImageQueryResult;
import gettheratings.home.tvdbWrapper.model.SeriesWrapper;

public class Tests {

	public static void main(String[] args) {
//		testTmdb();
//		testOmdb();
		testTvdb();
//		testNetflix();
	}

//	private static void testTmdb() {
//		String API_KEY = "56dc0d4b22d78c87610b733926334344";
//		TmdbMovies movies = new TmdbApi(API_KEY).getMovies();
//		MovieDb movie = movies.getMovie(5353, "en");
//		System.out.println(movie);
//	}

//	private static void testOmdb() {
//		Movie m = GetInfo.getMovie("tt0083658");
//		System.out.println(m);
//		
//		Series s = GetInfo.getSeries("tt0898266");
//		System.out.println(s);
//	}

	private static void testTvdb() {
//		String API_KEY = "D02DFCD117315CAD";
//		TheTvdb theTvdb = new TheTvdb(API_KEY);
//		try {
//			Series series = theTvdb.series().series(81189, "pt").execute().body().data;
//			System.out.println(series.seriesName + " is awesome!");
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//			
//		try {
//			List<Language> languages=theTvdb.languages().allAvailable().execute().body().data;
//			System.out.println(languages);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
//		try {
//			List<Series> seriesList=theTvdb.search().series("game", null, null, "en").execute().body().data;
//			System.out.println(seriesList);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		long millis = System.currentTimeMillis();
		GetInfo gi = new GetInfo();
		System.out.println(millis-System.currentTimeMillis());
		gi.getSeries(81189, "en");
		System.out.println(millis-System.currentTimeMillis());
		gi.getSeries(81189, "en");
		System.out.println(millis-System.currentTimeMillis());
		gi.getSeries(81189, "en");
		System.out.println(millis-System.currentTimeMillis());
		gi.getSeries(81189, "en");
		System.out.println(millis-System.currentTimeMillis());
		gi.getSeries(81189, "en");
		System.out.println(millis-System.currentTimeMillis());
		gi.getSeries(81189, "en");
		System.out.println(millis-System.currentTimeMillis());
		gi.getSeries(81189, "en");
		System.out.println(millis-System.currentTimeMillis());
		gi.getSeries(81189, "en");
		System.out.println(millis-System.currentTimeMillis());
		gi.getSeries(81189, "en");
		System.out.println(millis-System.currentTimeMillis());
		
		System.out.println("fim");
		
	}

//	private static void testNetflix() {
//		gettheratings.home.netflixWrapper.model.Movie m = gettheratings.home.netflixWrapper.Operations.GetInfo.getMovie("Gladiator", 2000);
//		System.out.println(m);
//	}

}
