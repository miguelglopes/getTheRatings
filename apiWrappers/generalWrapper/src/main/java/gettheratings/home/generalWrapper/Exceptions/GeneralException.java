package gettheratings.home.generalWrapper.Exceptions;

public class GeneralException extends Exception{

	private static final long serialVersionUID = 1L;
	
	public String message = "?";
	public String category = "?";
	
	public GeneralException() {
	}

	public GeneralException(String message) {
		super(message);
	}

	public GeneralException(String message, Exception e) {
		super(message, e);
	}

	public GeneralException(Exception e) {
		super(e);
	}
}
