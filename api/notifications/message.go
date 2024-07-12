package notifications

type Message struct {
	Type             string            `json:"type,omitempty" bson:"type,omitempty"`
	Id               string            `json:"id,omitempty" bson:"id,omitempty"`
	Timestamp        int64             `json:"timestamp,omitempty" bson:"timestamp,omitempty"`
	NotificationType string            `json:"notification_type,omitempty" bson:"notification_type,omitempty"` // generic, counting, region
	Title            string            `json:"title,omitempty" bson:"title,omitempty"`
	Body             string            `json:"body,omitempty" bson:"body,omitempty"`
	Unread           bool              `json:"unread,omitempty" bson:"unread,omitempty"`
	User             string            `json:"user,omitempty" bson:"user,omitempty"`
	UserId           string            `json:"userid,omitempty" bson:"userid,omitempty"`
	Timezone         string            `json:"timezone,omitempty" bson:"timezone,omitempty"`
	Email            string            `json:"email,omitempty" bson:"email,omitempty"`
	DataUsage        string            `json:"data_usage,omitempty" bson:"data_usage,omitempty"`
	Data             map[string]string `json:"data,omitempty" bson:"data,omitempty"`
	Fingerprint      string            `json:"fingerprint,omitempty" bson:"fingerprint,omitempty"`
}
