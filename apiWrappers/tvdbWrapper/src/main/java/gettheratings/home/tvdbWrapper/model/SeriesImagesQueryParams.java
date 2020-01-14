package gettheratings.home.tvdbWrapper.model;

import java.util.List;

public class SeriesImagesQueryParams {

    public List<SeriesImagesQueryParam> data;

    public class SeriesImagesQueryParam {

        public String keyType;
        public List<String> resolution;
        public List<String> subKey;

    }

}
