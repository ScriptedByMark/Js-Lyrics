import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class FeelThisMoment extends JFrame {

    private JLabel lyricsLabel;

    public FeelThisMoment() {
        // Initialize GUI components
        lyricsLabel = new JLabel();
        lyricsLabel.setHorizontalAlignment(SwingConstants.CENTER);
        lyricsLabel.setForeground(Color.WHITE);

        // Set up the JFrame
        setTitle("Feel This Moment");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        add(lyricsLabel, BorderLayout.CENTER);

        // Start a timer to display lyrics
        Timer timer = new Timer(4000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                displayLyrics("Feel this moment...");
            }
        });
        timer.start();
    }

    private class CustomPanel extends JPanel {
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            // Assume backgroundImage is an Image object already loaded
            Image backgroundImage = Toolkit.getDefaultToolkit().getImage("path/to/image.jpg");
            g.drawImage(backgroundImage, 0, 0, getWidth(), getHeight(), this);
        }
    }

    private void displayLyrics(String lyric) {
        lyricsLabel.setText(lyric);
        lyricsLabel.setForeground(Color.WHITE);
        fadeOut(lyricsLabel, () -> lyricsLabel.setText(""));
    }

    private void fadeOut(JLabel label, Runnable onComplete) {
        Timer fadeOutTimer = new Timer(20, null);
        fadeOutTimer.addActionListener(new ActionListener() {
            int alpha = 255;

            @Override
            public void actionPerformed(ActionEvent e) {
                if (alpha > 0) {
                    alpha -= 5;
                    label.setForeground(new Color(255, 255, 255, alpha));
                } else {
                    fadeOutTimer.stop();
                    onComplete.run();
                }
            }
        });
        fadeOutTimer.start();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            FeelThisMoment frame = new FeelThisMoment();
            frame.setVisible(true);
        });
    }
}
