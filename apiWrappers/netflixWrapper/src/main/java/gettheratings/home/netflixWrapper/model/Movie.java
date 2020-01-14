package gettheratings.home.netflixWrapper.model;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import gettheratings.home.generalWrapper.Exceptions.GeneralException;
import gettheratings.home.utils.Utilities;

@JsonIgnoreProperties({ "unit" })
public class Movie extends gettheratings.home.generalWrapper.model.Movie implements Serializable {

	public Movie(GeneralException e) {
		super(e);
	}
	
	public Movie() {
	}

	private static final long serialVersionUID = 1L;

	@JsonProperty("show_title")
	private String title;
	@JsonProperty("show_id")
	private String id;
	@JsonProperty("category")
	private String category;
	@JsonProperty("summary")
	private String summary;
	@JsonProperty("poster")
	private String poster;
	@JsonProperty("mediatype")
	private String netflixType;
	private String netflixUrl;

	@JsonProperty("release_year")
	private int year;
	private int mediaType = 1;
	@JsonProperty("rating")
	private int rating;
	@JsonProperty("runtime")
	private int runtime;

	@JsonProperty("show_cast")
	private List<String> show_cast;
	@JsonProperty("director")
	private List<String> directors;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
		if (this.netflixType != null)
			generateUrl();
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	public String getNetflixType() {
		return netflixType;
	}

	public void setNetflixType(String netflixType) {
		this.netflixType = netflixType;
		if (this.id != null)
			generateUrl();
	}

	public String getNetflixUrl() {
		return netflixUrl;
	}

	public void setNetflixUrl(String netflixUrl) {
		this.netflixUrl = netflixUrl;
	}

	public int getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = Utilities.tryParseInt(year);
	}

	public int getMediaType() {
		return mediaType;
	}

	public void setMediaType(int mediaType) {
		this.mediaType = mediaType;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(String rating) {
		try {
			this.rating = new Double(Double.parseDouble(rating) * 20).intValue();
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getRuntime() {
		return runtime;
	}

	public void setRuntime(String runtime) {
		this.runtime = Utilities.tryParseInt(runtime.replaceAll(" min", ""));
	}

	public List<String> getShow_cast() {
		return show_cast;
	}

	public void setShow_cast(String show_cast) {
		this.show_cast = Arrays.asList(show_cast.split(","));
	}

	public List<String> getDirectors() {
		return directors;
	}

	public void setDirectors(String directors) {
		this.directors = Arrays.asList(directors.split(","));
	}

	private void generateUrl() {
		// para series é shows e nao Movie
		this.netflixUrl = "http://dvd.netflix.com/Movie/" + this.id;
	}
}
