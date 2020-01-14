package gettheratings.home.tvdbWrapper.model;

import java.util.ArrayList;
import java.util.List;

import gettheratings.home.generalWrapper.Exceptions.GeneralException;
import gettheratings.home.generalWrapper.model.Error;

/**
 * Base Series record.
 *
 * @see <a href=
 *      "http://www.thetvdb.com/wiki/index.php?title=API:Base_Series_Record">API
 *      :Base Series Record</a>
 */
public class Series {

	public Error er = null;

	public void setEr(GeneralException e) {
		this.er = new Error(e);
	}

	public Series(GeneralException e) {
		setEr(e);
	}

	/**
	 * An unsigned integer assigned by our site to the series. It does not
	 * change and will always represent the same series. Cannot be null.
	 */
	public Integer id;
	public String seriesName;
	public List<String> aliases = new ArrayList<>();
	public String banner;
	/**
	 * A string containing either "Ended" or "Continuing". Can be null.
	 */
	public String status;
	public String firstAired;
	public String network;
	public String networkId;
	public String runtime;
	public List<String> genre = new ArrayList<>();
	public String overview;
	public Long lastUpdated;
	public String airsDayOfWeek;
	public String airsTime;
	public String rating;
	public String imdbId;
	public String zap2itId;
	public String added;
	public Integer addedBy;
	public Double siteRating;

}
