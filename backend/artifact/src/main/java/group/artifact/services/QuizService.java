package group.artifact.services;

import java.util.LinkedList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.QuizDTO;
import group.artifact.models.Question;
import group.artifact.models.Selection;
import group.artifact.repositories.QuestionRepository;
import group.artifact.repositories.SelectionRepository;

@Service
public class QuizService {

    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    SelectionRepository selectionRepository;

    public QuizDTO receive(Integer qid) { // question id
        Question question;
        if (qid == null) { // choose a random question
            List<Question> allQuestions = questionRepository.findAll();
            Random random = new Random();
            question = allQuestions.get(random.nextInt(allQuestions.size()));
        } else { // select question by id
            question = questionRepository.findById(qid).orElse(null);
        }

        if (question == null) {
            System.out.println("ERROR: no question found when searching by id or selecting a random one");
            return null;
        }
        QuizDTO quiz = new QuizDTO();
        quiz.setText(question.getText());

        List<Selection> selections = selectionRepository.findByQuestion(question);
        String[] s = selections.stream()
                .map(Selection::getAnswer)
                .toArray(String[]::new);
        quiz.setSelections(s);

        List<Integer> indexes = new LinkedList<>();
        for (int i = 0; i < selections.size(); i++) {
            if (selections.get(i).isSolution()) {
                indexes.add(i);
            }
        }
        quiz.setSolutionIndexes(indexes);
        return quiz;
    }

    public void save(QuizDTO quiz) {
        Question q = new Question();
        q.setText(quiz.getText()); // extract question from quizdto
        questionRepository.save(q);

        List<Integer> indexes = quiz.getSolutionIndexes();
        for (int i = 0; i < quiz.getSelections().length; i++) {
            Selection s = new Selection();
            s.setAnswer(quiz.getSelections()[i]);
            s.setSolution(indexes.contains(i));
            s.setQuestion(q);
            selectionRepository.save(s);
        }
    }
}
