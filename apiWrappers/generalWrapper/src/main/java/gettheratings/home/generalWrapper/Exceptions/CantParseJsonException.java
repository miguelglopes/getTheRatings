package gettheratings.home.generalWrapper.Exceptions;

public class CantParseJsonException extends GeneralException {

	private static final long serialVersionUID = 1L;
	String category = "INVALID_JSON";
	String message = "Unable to parse JSON";
	
	public CantParseJsonException() {
	}
	
	public CantParseJsonException(String message) {
		super(message);
		super.message=message;
		super.category=this.category;
	}
	
	public CantParseJsonException(Exception e) {
		super(e);
		super.message=e.getMessage();
		super.category=this.category;
	}


}
