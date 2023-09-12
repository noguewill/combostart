// comboCardLogic.js

import { useState, useEffect } from "react";
import {
  recordVote,
  removeVote,
  addRatesToUserData,
  fetchUserVoteHistory,
} from "../logic/dataSend";
import { fetchVoteData, fetchRates } from "../logic/dataFetch";

export function useComboCardLogic(
  displayedCombos,
  userId,
  loggedIn,
  setShowSignIn
) {
  const [parsedComboStrings, setParsedComboStrings] = useState([]);
  const [stringsCount, setStringsCount] = useState(null);
  const [postExpandCollapse, setPostExpandCollapse] = useState({});
  const [comboHighlighted, setComboHighlighted] = useState([]);

  const [voteStatus, setVoteStatus] = useState({});
  const [currentVotes, setCurrentVotes] = useState({});
  const [renderedPostIds, setRenderedPostIds] = useState([]);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      displayedCombos.forEach((val) => {
        const postId = val.postId?.S;
        setCurrentVotes((prevVotes) => ({
          ...prevVotes,
          [postId]: parseInt(val.VoteCount?.N, 10),
        }));
        setParsedComboStrings(JSON.parse(val.ComboStrings?.S));
      });
      try {
        await fetchUserVoteHistory(userId);
      } catch (error) {
        console.error();
      }
    };

    setStringsCount(
      parsedComboStrings.reduce(
        (totalCount, comboArray) =>
          totalCount +
          comboArray.filter((item) => item.type === "image").length,
        0
      )
    );

    const didUserVote = async () => {
      const newVoteStatus = {};
      const comboId = [];
      displayedCombos.map((val) => {
        comboId.push(val.postId?.S);
        console.log("comboId", comboId);
      });
      for (const combo of displayedCombos) {
        console.log("combo:", combo);
        const postId = combo.postId?.S;
        console.log("postId:", postId);
        const voteData = await fetchVoteData(postId, userId);
        newVoteStatus[postId] = voteData;
      }
      setVoteStatus(newVoteStatus);
    };

    fetchData();
    didUserVote();
  }, [displayedCombos, userId]);

  // Function to determine whether to show the comboArrow element icon
  const shouldShowComboArrow = (currentIndex) => {
    return currentIndex < parsedComboStrings.length - 1;
  };

  const handleUpvote = async (postId) => {
    if (loggedIn !== false) {
      try {
        const voteData = await fetchVoteData(postId, userId);

        if (voteData === "upvote") {
          setCurrentVotes((prevVotes) => ({
            ...prevVotes,
            [postId]: prevVotes[postId] - 1,
          }));
          await removeVote(postId, userId, "upvote");
        } else {
          setCurrentVotes((prevVotes) => ({
            ...prevVotes,
            [postId]: prevVotes[postId] + (voteData === "downvote" ? 2 : 1),
          }));
          await recordVote(postId, userId, "upvote");
        }

        const newVoteStatus = { ...voteStatus };
        newVoteStatus[postId] = voteData === "upvote" ? null : "upvote";
        setVoteStatus(newVoteStatus);
      } catch (error) {
        console.error("Error handling upvote:", error);
      }
    } else {
      setShowSignIn(true);
    }
  };

  const handleDownvote = async (postId) => {
    if (loggedIn !== false) {
      try {
        const voteData = await fetchVoteData(postId, userId);
        const rates = await fetchRates(userId);

        if (rates.voteRate <= 0 && rates.rateTimer !== 0) {
          setLimitReached(true);
        } else {
          addRatesToUserData(userId);
          setLimitReached(false);
        }
        if (limitReached === false) {
          if (voteData === "downvote") {
            setCurrentVotes((prevVotes) => ({
              ...prevVotes,
              [postId]: prevVotes[postId] + 1,
            }));
            await removeVote(postId, userId, "downvote");
            setVoteStatus({});
          } else {
            setCurrentVotes((prevVotes) => ({
              ...prevVotes,
              [postId]: prevVotes[postId] - (voteData === "upvote" ? 2 : 1),
            }));
            await recordVote(postId, userId, "downvote");
          }

          const newVoteStatus = { ...voteStatus };
          newVoteStatus[postId] = voteData === "downvote" ? null : "downvote";
          setVoteStatus(newVoteStatus);
        }
      } catch (error) {
        console.error("Error handling downvote:", error);
      }
    } else {
      setShowSignIn(true);
    }
  };

  const handleComboHighlight = (postId) => {
    // Find the specific combo
    const specificCombo = displayedCombos.find(
      (combo) => combo.postId?.S === postId
    );

    // Create an empty array to hold the picked combo
    const pickedCombo = [];

    // Push the specific combo into the pickedCombo array
    pickedCombo.push(specificCombo);

    // Set pickedCombo as the new value for comboHighlighted
    setComboHighlighted(pickedCombo);
  };

  return {
    stringsCount,
    voteStatus,
    currentVotes,
    renderedPostIds,
    hoveredPost,
    shouldShowComboArrow,
    handleUpvote,
    handleDownvote,
    handleComboHighlight,
    setRenderedPostIds,
    setHoveredPost,
    postExpandCollapse,
    setPostExpandCollapse,
    comboHighlighted,
  };
}
