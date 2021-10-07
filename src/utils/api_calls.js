import http from "./http_common";
import { getDate } from "../utils/timestamp";

class PampApi {
    getAll() {
        return http.get("/all");
    }
    
    create_feed(data) {
        data.date = getDate();
        return http.post("/new/feed", data);
    }

    delete_feed(data) {
        return http.post("/del/feed", data);
    }

    create_bowel(data) {
        data.date = getDate();
        return http.post("/new/bowel", data);
    }

    delete_bowel(data) {
        return http.post("/del/bowel", data);
    }

    update(id, data) {
        return http.put(`/update/${id}`, data);
    }
}

export default new PampApi();