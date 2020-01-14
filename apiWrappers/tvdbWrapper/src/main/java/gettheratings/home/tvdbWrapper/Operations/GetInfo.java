package gettheratings.home.tvdbWrapper.Operations;

import java.util.List;

import com.uwetrottmann.thetvdb.TheTvdb;

import gettheratings.home.generalWrapper.Exceptions.CantParseJsonException;
import gettheratings.home.tvdbWrapper.model.Series;
import gettheratings.home.tvdbWrapper.model.SeriesImageQueryResults;
import gettheratings.home.tvdbWrapper.model.SeriesImageQueryResults.SeriesImageQueryResult;
import gettheratings.home.tvdbWrapper.model.SeriesWrapper;
import retrofit2.Response;

/**
 * Methods to get all information for an object
 * @author Miguel
 *
 */
public class GetInfo {

	public static String APIKEY = "D02DFCD117315CAD";
	TheTvdb theTvdb = new TheTvdb(APIKEY);
	/**
	 * Gets all information for a series id
	 * @param tvdbId
	 * @return
	 */
	public Series getSeries(int tvdbId, String language) {
		try {
			Response<SeriesWrapper> response = theTvdb.series().series(tvdbId, language).execute();
			 return response.body().data;
		} catch (Exception e) {
			return new Series(new CantParseJsonException(e));
		}
		
	}
	
	public List<SeriesImageQueryResult> getSeriesImage(int tvdbId, String language) {
		
		try {
			Response<SeriesImageQueryResults> response = theTvdb.series().imagesQuery(tvdbId, "poster", null, null, language).execute();
					System.out.println(theTvdb.jsonWebToken());
					System.out.println(response.body().data.get(0).fileName);
			 return response.body().data;
		} catch (Exception e) {
			System.out.println("pum");
			return null;
		}
		
	}

}
