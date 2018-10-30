var friendsData = require("../data/friends.js");


module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        var scoresStringArray = req.body.scores;
        var scoresNumberArray = [];
        var scoresCompare = [];
        var sum = 0;

        compareScores();
        findMatch();


        function compareScores() {
            for (var i = 0; i < scoresStringArray.length; i++) {
                scoresNumberArray.push(parseInt(scoresStringArray[i]));
            }

            var userScores = req.body.scores;


            for (var j = 0; j < friendsData.length; j++) {

                for (var s = 0; s < scoresNumberArray.length; s++) {
                    sum += Math.abs(friendsData[j].scores[s] - scoresNumberArray[s]);
                }

                scoresCompare.push(sum);

                sum = 0;
            }
        }

        function findMatch() {

            var lowestDiff = scoresCompare[0];
            var matchIndex;


            for (var i = 0; i < scoresCompare.length; i++) {
                if (scoresCompare[i] < lowestDiff) {
                    lowestDiff = scoresCompare[i];
                }

                matchIndex = (scoresCompare.indexOf(lowestDiff));
            }

            var match = friendsData[matchIndex];
            friendsData.push(req.body);
            res.json(match);
        }
    });
};