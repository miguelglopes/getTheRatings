package gettheratings.home.generalWrapper.model;

import gettheratings.home.generalWrapper.Exceptions.GeneralException;

public class Error {
	public String message = "?";
	public String category = "?";
	
	public Error(GeneralException e){
		this.message=e.message;
		this.category=e.category;
	}
}
