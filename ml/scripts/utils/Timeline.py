import matplotlib.pyplot as plt

class Timeline:
    def __init__(self, video_char: dict):
        """ Initialize the timeline object.
        """

        # Create matplotlib figure and axis
        fig, ax = plt.subplots()
        self.fig = fig
        self.ax = ax

        self.total_frames = int(video_char["total_frames"]//video_char["frame_skip_factor"])
        self.detection_colors = ['None'] * self.total_frames
        self.frame_count = 0

        plt.ion()  # Turn on interactive mode
        plt.show()

    def update_timeline(self, detection: bool):
        """ Update the status and fill the bar with color.
        """

        # Update detection_colors based on detected_bool
        if detection:
            self.detection_colors[self.frame_count] = "green"
        else:
            self.detection_colors[self.frame_count] = "white"
        
        self.ax.clear()
        self.ax.set_yticks([])
        self.ax.set_title("Detection timeline", fontsize=16)
        self.ax.set_xlim([0, self.total_frames])

        # Plot the bars
        self.ax.bar(range(self.total_frames), [1]*self.total_frames, color=self.detection_colors)

        self.frame_count += 1