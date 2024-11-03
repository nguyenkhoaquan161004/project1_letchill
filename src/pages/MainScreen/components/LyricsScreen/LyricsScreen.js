import React from 'react';
import styles from './LyricsScreen.module.css';

const LyricsScreen = ({ isOpen }) => {
    if (!isOpen) return null; // Don't render if isOpen is false

    return (
        <div className={styles.lyricsContainer} >
            <h4 className={styles.lyricsOfSong}>
                I can read your minds
                <br />"She's having the time of her life"
                <br />There in her glittering prime
                <br />The lights refract sequined stars off her silhouette every night
                <br />I can show you lies (one, two, three, four)
                <br />'Cause I'm a real tough kid, I can handle my shit
                <br />They said, "Babe, you gotta fake it 'til you make it" and I did
                <br />Lights, camera, bitch smile, even when you wanna die
                <br />He said he'd love me all his life
                <br />But that life was too short
                <br />Breaking down, I hit the floor
                <br />All the pieces of me shattered as the crowd was chanting, "More"
                <br />I was grinning like I'm winning, I was hitting my marks
                <br />'Cause I can do it with a broken heart (one, two, three, four)
                <br />I'm so depressed, I act like it's my birthday every day
                <br />I'm so obsessed with him but he avoids me like the plague
                <br />I cry a lot but I am so productive, it's an art
                <br />You know you're good when you can even do it
                <br />With a broken heart
                <br />I can hold my breath
                <br />I've been doing it since he left
                <br />I keep finding his things in drawers
                <br />Crucial evidence, I didn't imagine the whole thing
                <br />I'm sure I can pass this test (one, two, three, four)
                <br />'Cause I'm a real tough kid, I can handle my shit
                <br />They said, "Babe, you gotta fake it 'til you make it" and I did
                <br />Lights, camera, bitch smile, in stilettos for miles
                <br />He said he'd love me for all time
                <br />But that time was quite short
                <br />Breaking down, I hit the floor
                <br />All the pieces of me shattered as the crowd was chanting, "More"
                <br />I was grinning like I'm winning, I was hitting my marks
                <br />'Cause I can do it with a broken heart (one, two, three)
                <br />I'm so depressed, I act like it's my birthday every day
                <br />I'm so obsessed with him but he avoids me like the plague (he avoids me)
                <br />I cry a lot but I am so productive, it's an art
                <br />You know you're good when you can even do it
                <br />With a broken heart
                <br />You know you're good when you can even do it
                <br />With a broken heart
                <br />You know you're good, I'm good
                <br />'Cause I'm miserable
                <br />And nobody even knows
                <br />Try and come for my job</h4>
        </div>
    );
};

        export default LyricsScreen;