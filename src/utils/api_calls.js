import http from "./http_common";
import { getDate, getTime } from "../utils/timestamp";

class PampApi {
    getAll() {
        return http.get("/all");
    }
    
    create_feed(data) {
        data.date = getDate();
        return http.post("/new/feed", data);
    }

    create_bowel(data) {
        data.date = getDate();
        return http.post("/new/bowel", data);
    }

    update(id, data) {
        return http.put(`/update/${id}`, data);
    }

    delete(id) {
        return http.delete(`/delete/${id}`);
    }
}

export default new PampApi();