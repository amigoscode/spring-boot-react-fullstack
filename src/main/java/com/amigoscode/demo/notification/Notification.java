package com.amigoscode.demo.notification;

import java.time.ZonedDateTime;
import java.util.Objects;

public class Notification {
    private String message;
    private ZonedDateTime timestamp;

    public Notification() {
    }

    public Notification(String message, ZonedDateTime timestamp) {
        this.message = message;
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Notification that = (Notification) o;
        return Objects.equals(message, that.message) &&
                Objects.equals(timestamp, that.timestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(message, timestamp);
    }

    @Override
    public String toString() {
        return "Notification{" +
                "message='" + message + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
