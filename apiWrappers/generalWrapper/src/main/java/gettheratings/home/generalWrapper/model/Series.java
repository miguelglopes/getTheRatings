package gettheratings.home.generalWrapper.model;

import java.io.IOException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import gettheratings.home.generalWrapper.Exceptions.CantConnectException;
import gettheratings.home.generalWrapper.Exceptions.CantParseJsonException;
import gettheratings.home.generalWrapper.Exceptions.GeneralException;
import gettheratings.home.generalWrapper.Tools.Tools;

public abstract class Series extends GeneralObject {

	public Series(GeneralException e) {
		super(e);
	}
	
	public Series() {
	}

	public static Series map(String response, Class<? extends Series> sc, Boolean isXML) throws CantParseJsonException, CantConnectException{
		Series s = null;
		try {
			if(!isXML)
				s = Tools.jsonMapper.readValue(response, sc);
			else
				s = Tools.xmlMapper.readValue(response, sc);
		} catch (JsonParseException e) {
			throw new CantParseJsonException(e);
		} catch (JsonMappingException e) {
			throw new CantParseJsonException(e);
		} catch (IOException e) {
			throw new CantConnectException(e);
		}
		return s;
	}
	
	public static Series map(String response, Class<? extends Series> sc) throws CantParseJsonException, CantConnectException{
		return map(response, sc, false);
	}

}