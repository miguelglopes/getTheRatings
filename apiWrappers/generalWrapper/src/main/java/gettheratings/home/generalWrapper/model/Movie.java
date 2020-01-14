package gettheratings.home.generalWrapper.model;

import java.io.IOException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import gettheratings.home.generalWrapper.Exceptions.CantConnectException;
import gettheratings.home.generalWrapper.Exceptions.CantParseJsonException;
import gettheratings.home.generalWrapper.Exceptions.GeneralException;
import gettheratings.home.generalWrapper.Tools.Tools;

public abstract class Movie extends GeneralObject{
		
	public Movie(GeneralException e) {
		super(e);
	}
	
	public Movie() {
	}

	public static Movie map(String response, Class<? extends Movie> sc, Boolean isXML) throws CantParseJsonException, CantConnectException{
		Movie m = null;
		try {
			if(!isXML)
				m = Tools.jsonMapper.readValue(response, sc);
			else
				m = Tools.xmlMapper.readValue(response, sc);
		} catch (JsonParseException e) {
			throw new CantParseJsonException(e);
		} catch (JsonMappingException e) {
			throw new CantParseJsonException(e);
		} catch (IOException e) {
			throw new CantConnectException(e);
		}
		return m;
	}
	
	public static Movie map(String response, Class<? extends Movie> sc) throws CantParseJsonException, CantConnectException{
		return map(response, sc, false);
	}

}