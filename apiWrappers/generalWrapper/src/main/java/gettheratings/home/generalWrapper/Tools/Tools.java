package gettheratings.home.generalWrapper.Tools;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;


public abstract class Tools {
	
	public static ObjectMapper jsonMapper = new ObjectMapper();
	public static XmlMapper xmlMapper = new XmlMapper();

    public static String sendPostRequest(String urlToRead, String post) {
		StringBuilder result = new StringBuilder();

		try{
		URL url = new URL(urlToRead);
		HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
		
		
		if(post!=null){
			httpConn.setRequestMethod("POST");
			httpConn.setDoOutput(true);
			DataOutputStream wr = new DataOutputStream( httpConn.getOutputStream());
		    wr.write( post.getBytes(StandardCharsets.UTF_8) );
		} else{
			httpConn.setRequestMethod("GET");
		}
		
		BufferedReader rd = new BufferedReader(new InputStreamReader(httpConn.getInputStream(), StandardCharsets.UTF_8));
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		rd.close();
		} catch(Exception ex){
			
		}
		return result.toString();
	}
	
	public static String sendGetRequest(String urlToRead) {
		return sendPostRequest(urlToRead, null);
	}
	
}
