from datetime import datetime, timedelta
from server import db

class Schedule(db.Model):
    __tablename__ = 'schedule'

    # Primary Key
    id = db.Column(db.Integer, primary_key=True)
    route_id = db.Column(db.Integer, db.ForeignKey('route.id'), nullable=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('driver.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False) 
    end_time = db.Column(db.Time, nullable=False) 
    ticket_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default="active") 
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    driver = db.relationship("Driver", back_populates="schedules")
    tickets = db.relationship("Ticket", back_populates="schedule")
    route = db.relationship("Route", back_populates="schedules")

    def __repr__(self):
        return f"<Schedule(route_id={self.route_id}, driver_id={self.driver_id}, start_time={self.start_time}, end_time={self.end_time}, ticket_price={self.ticket_price})>"

    def duration(self):
        """Calculate the duration between start_time and end_time in a more readable format."""
        start = datetime.combine(datetime.today(), self.start_time)
        end = datetime.combine(datetime.today(), self.end_time)

        # If end time is before start time, it's considered as the next day
        if end < start:
            end += timedelta(days=1)

        duration = end - start
        hours = duration.seconds // 3600
        minutes = (duration.seconds % 3600) // 60

        # Construct the duration string
        duration_str = f"{hours} h"
        if minutes > 0:
            duration_str += f" {minutes} m"
        
        return duration_str

    @staticmethod
    def is_overlapping(session, driver_id, date, start_time, end_time):
        conflicting_schedule = session.query(Schedule).filter(
            Schedule.driver_id == driver_id,
            Schedule.date == date,
            Schedule.start_time < end_time,
            Schedule.end_time > start_time
        ).first()
        return conflicting_schedule is not None