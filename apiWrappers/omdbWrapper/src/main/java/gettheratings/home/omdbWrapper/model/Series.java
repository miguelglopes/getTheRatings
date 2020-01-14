package gettheratings.home.omdbWrapper.model;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import gettheratings.home.generalWrapper.Exceptions.GeneralException;
import gettheratings.home.utils.DateUtilities;

/**
 * Object Series
 * @author Miguel
 *
 */
@JsonIgnoreProperties({ "Response" })
public class Series extends gettheratings.home.generalWrapper.model.Series implements Serializable {

	public Series(GeneralException e) {
		super(e);
	}
	
	public Series() {
	}

	private static final long serialVersionUID = 1L;

	@JsonProperty("Title")
	private String title;
	@JsonProperty("imdbID")
	private String imdbID;
	@JsonProperty("Poster")
	private String poster;
	@JsonProperty("Rated")
	private String rated;
	@JsonProperty("Plot")
	private String plot;
	@JsonProperty("tomatoImage")
	private String tomatoImage;
	@JsonProperty("BoxOffice") // TODO
	private String boxOffice;
	@JsonProperty("Production")
	private String production;
	@JsonProperty("Website")
	private String website;
	@JsonProperty("Awards")
	private String awards;
	@JsonProperty("tomatoConsensus")
	private String tomatoConsensus;
	@JsonProperty("tomatoURL")
	private String tomatoUrl;
	@JsonProperty("Type")
	private String omdbType;
	private String imdbUrl;
	private String metacriticUrl;

	@JsonProperty("Year")
	private int year;
	private int mediaType = 2;
	@JsonProperty("imdbRating")
	private int imdbRating;
	@JsonProperty("imdbVotes")
	private int imdbVotes;
	@JsonProperty("tomatoMeter")
	private int tomatoMeter;
	@JsonProperty("tomatoRating")
	private int tomatoRating;
	@JsonProperty("tomatoReviews")
	private int tomatoReviews;
	@JsonProperty("tomatoFresh")
	private int tomatoFresh;
	@JsonProperty("tomatoRotten")
	private int tomatoRotten;
	@JsonProperty("tomatoUserMeter")
	private int tomatoUserMeter;
	@JsonProperty("tomatoUserRating")
	private int tomatoUserRating;
	@JsonProperty("tomatoUserReviews")
	private int tomatoUserReviews;
	@JsonProperty("Metascore")
	private int metascore;
	@JsonProperty("Runtime")
	private int runtime;
	@JsonProperty("totalSeasons")
	private int totalSeasons;

	@JsonProperty("DVD")
	private Date dvd;
	@JsonProperty("Released")
	private Date released;

	@JsonProperty("Language")
	private List<String> languages;
	@JsonProperty("Genre")
	private List<String> genres;
	@JsonProperty("Actors")
	private List<String> actors;
	@JsonProperty("Country")
	private List<String> countries;
	@JsonProperty("Writer")
	private List<String> writers;
	@JsonProperty("Director")
	private List<String> directors;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.setMetacriticUrl("http://www.metacritic.com/search/all/"+title+"/results");
		this.title = title;
	}

	public String getImdbID() {
		return imdbID;
	}

	public void setImdbID(String imdbID) {
		this.imdbUrl="http://www.imdb.com/title/"+imdbID;
		this.imdbID = imdbID;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	public String getRated() {
		return rated;
	}

	public void setRated(String rated) {
		this.rated = rated;
	}

	public String getPlot() {
		return plot;
	}

	public void setPlot(String plot) {
		this.plot = plot;
	}

	public String getTomatoImage() {
		return tomatoImage;
	}

	public void setTomatoImage(String tomatoImage) {
		this.tomatoImage = tomatoImage;
	}

	public String getTomatoConsensus() {
		return tomatoConsensus;
	}

	public void setTomatoConsensus(String tomatoConsensus) {
		this.tomatoConsensus = tomatoConsensus;
	}

	public String getTomatoUrl() {
		return tomatoUrl;
	}

	public void setTomatoUrl(String tomatoUrl) {
		this.tomatoUrl = tomatoUrl;
	}

	public String getBoxOffice() {
		return boxOffice;
	}

	public void setBoxOffice(String boxOffice) {
		this.boxOffice = boxOffice;
	}

	public String getProduction() {
		return production;
	}

	public void setProduction(String tomatoProduction) {
		this.production = tomatoProduction;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String tomatoWebsite) {
		this.website = tomatoWebsite;
	}

	public String getAwards() {
		return awards;
	}

	public void setAwards(String awards) {
		this.awards = awards;
	}
	
	public String getOmdbType() {
		return omdbType;
	}

	public void setOmdbType(String omdbType) {
		this.omdbType = omdbType;
	}
	
	public String getImdbUrl() {
		return imdbUrl;
	}

	public void setImdbUrl(String imdbUrl) {
		this.imdbUrl = imdbUrl;
	}
	
	public String getMetacriticUrl() {
		return metacriticUrl;
	}

	public void setMetacriticUrl(String metacriticUrl) {
		this.metacriticUrl = metacriticUrl;
	}

	public List<String> getGenres() {
		return genres;
	}

	public void setGenres(String genres) {
		this.genres = Arrays.asList(genres.split(","));
	}

	public List<String> getActors() {
		return actors;
	}

	public void setActors(String actors) {
		this.actors = Arrays.asList(actors.split(","));
	}

	public List<String> getLanguages() {
		return languages;
	}

	public void setLanguages(String language) {
		this.languages = Arrays.asList(language.split(","));
	}

	public List<String> getCountries() {
		return countries;
	}

	public void setCountries(String countries) {
		this.countries = Arrays.asList(countries.split(","));
	}

	public List<String> getWriters() {
		return writers;
	}

	public void setWriters(String writers) {
		this.writers = Arrays.asList(writers.split(","));
	}

	public List<String> getDirectors() {
		return directors;
	}

	public void setDirectors(String directors) {
		this.directors = Arrays.asList(directors.split(","));
	}

	public int getYear() {
		return year;
	}

	public void setYear(String year) {
		try {
			this.year = Integer.parseInt(year.replace("–", ""));
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getMediaType() {
		return mediaType;
	}

	public void setMediaType(int mediaType) {
		this.mediaType = mediaType;
	}

	public int getImdbRating() {
		return imdbRating;
	}

	public void setImdbRating(String imdbRating) {
		try {
			this.imdbRating = new Double(Double.parseDouble(imdbRating) * 10).intValue();
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getImdbVotes() {
		return imdbVotes;
	}

	public void setImdbVotes(String imdbVotes) {
		try {

			this.imdbVotes = Integer.parseInt(imdbVotes.replace(",", ""));
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getTomatoMeter() {
		return tomatoMeter;
	}

	public void setTomatoMeter(String tomatoMeter) {
		try {
			this.tomatoMeter = Integer.parseInt(tomatoMeter);
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getTomatoRating() {
		return tomatoRating;
	}

	public void setTomatoRating(String tomatoRating) {
		try {
			this.tomatoRating = new Double(Double.parseDouble(tomatoRating) * 10).intValue();
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getTomatoReviews() {
		return tomatoReviews;
	}

	public void setTomatoReviews(String tomatoReviews) {
		try {
			this.tomatoReviews = Integer.parseInt(tomatoReviews);
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getTomatoFresh() {
		return tomatoFresh;
	}

	public void setTomatoFresh(String tomatoFresh) {
		try {
			this.tomatoFresh = Integer.parseInt(tomatoFresh);
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getTomatoRotten() {
		return tomatoRotten;
	}

	public void setTomatoRotten(String tomatoRotten) {
		try {
			this.tomatoRotten = Integer.parseInt(tomatoRotten);
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getTomatoUserMeter() {
		return tomatoUserMeter;
	}

	public void setTomatoUserMeter(String tomatoUserMeter) {
		try {
			this.tomatoUserMeter = Integer.parseInt(tomatoUserMeter);
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getTomatoUserRating() {
		return tomatoUserRating;
	}

	public void setTomatoUserRating(String tomatoUserRating) {
		try {
			this.tomatoUserRating = new Double(Double.parseDouble(tomatoUserRating) * 20).intValue();
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getTomatoUserReviews() {
		return tomatoUserReviews;
	}

	public void setTomatoUserReviews(String tomatoUserReviews) {
		try {
			this.tomatoUserReviews = Integer.parseInt(tomatoUserReviews);
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getMetascore() {
		return metascore;
	}

	public void setMetascore(String metascore) {
		try {
			this.metascore = Integer.parseInt(metascore);
		} catch (Exception ex) {
			// do nothing
		}
	}

	public int getRuntime() {
		return runtime;
	}

	public void setRuntime(String runtime) {
		try {
			this.runtime = Integer.parseInt(runtime.replaceAll(" min", ""));
		} catch (Exception ex) {
			// do nothing
		}
	}
	
	public int getTotalSeasons() {
		return totalSeasons;
	}

	public void setTotalSeasons(String totalSeasons) {
		try {
			this.totalSeasons = Integer.parseInt(totalSeasons);
		} catch (Exception ex) {
			// do nothing
		}
	}

	public Date getDvd() {
		return dvd;
	}

	public void setDvd(String tomatoDvd) {
		try {
			this.dvd = DateUtilities.string2date(tomatoDvd, new SimpleDateFormat("dd MMM yyyy", Locale.US));
		} catch (ParseException e) {
			this.dvd = null;
		}
	}

	public Date getReleased() {
		return released;
	}

	public void setReleased(String released) {
		try {
			this.released = DateUtilities.string2date(released, new SimpleDateFormat("dd MMM yyyy", Locale.US));
		} catch (ParseException e) {
			this.released = null;
		}
	}
}
