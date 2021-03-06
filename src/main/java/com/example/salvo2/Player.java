package com.example.salvo2;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.FetchType;
import java.util.Set;


@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private String fullName;
    private String userName;
    private String userPassword;

    @OneToMany(mappedBy="player", fetch=FetchType.EAGER)
    Set<GamePlayer> gamePlayers;

    @OneToMany(mappedBy="player", fetch=FetchType.EAGER)
    Set<Score> allScores;


    public Player () { }

    public Player (String name, String email, String password) {
        this.fullName = name;
        this.userName = email;
        this.userPassword = password;

    }
    public long getId() {
        return id;
    }
    public String getFirstName() {
        return fullName;
    }

    public void setFirstName(String firstName) {
        this.fullName = firstName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String toString() {
        return userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public void addGamePlayer(GamePlayer gamePlayer) {
        gamePlayer.setPlayer(this);
        gamePlayers.add(gamePlayer);
    }

    public Score getScore(Game game) {
        for (Score score: allScores) {
            if (score.getGame() == game) {
                return score;
            }
        }
        return null;
    }

    public Set<Score> getAllScores() { return allScores; }


    public void setAllScores(Set<Score> allScores) {
        this.allScores = allScores;
    }

    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }
}
