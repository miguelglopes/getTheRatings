package gettheratings.home.generalWrapper.Exceptions;

public class CantConnectException extends GeneralException {

	private static final long serialVersionUID = 1L;
	
	String category = "CONNECTION_ERROR";
	String message = "Unable to connect";
	
	public CantConnectException() {
	}
	
	public CantConnectException(String message) {
		super(message);
		super.message=message;
		super.category=this.category;
	}
	
	public CantConnectException(Exception e) {
		super(e);
		super.message=e.getMessage();
		super.category=this.category;
	}

}
