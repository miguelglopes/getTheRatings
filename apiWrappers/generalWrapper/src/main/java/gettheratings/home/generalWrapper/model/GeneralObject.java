package gettheratings.home.generalWrapper.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gettheratings.home.generalWrapper.Exceptions.GeneralException;

public class GeneralObject {
	public Error er = null;

	public Error getEr() {
		return er;
	}

	@JsonIgnore
	public void setEr(Error er) {
		this.er = er;
	}
	
	@JsonIgnore
	public void setEr(GeneralException e) {
		this.er = new Error(e);
	}
	
	public GeneralObject(GeneralException e){
		setEr(e);
	}
	
	public GeneralObject(){
	}
	
}
