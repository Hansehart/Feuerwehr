package group.artifact.services;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.QuizDTO;
import group.artifact.models.Question;
import group.artifact.models.Selection;
import group.artifact.models.User;
import group.artifact.models.mappers.UsersAndQuestions;
import group.artifact.repositories.QuestionRepository;
import group.artifact.repositories.SelectionRepository;
import group.artifact.repositories.UsersAndQuestionsRepository;

@Service
public class QuizService {

    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    SelectionRepository selectionRepository;
    @Autowired
    UsersAndQuestionsRepository usersAndQuestionsRepository;
    @Autowired
    UserService userService;

    public QuizDTO receive(String category) {
        Question question;
        switch (category.toLowerCase()) {
            case "allgemeinwissen":
            System.out.println(category + " 1");
                question = questionRepository.findRandomByCategory("Allgemeinwissen");
                break;
            case "ausrüstung":
            System.out.println(category + " 2");

                question = questionRepository.findRandomByCategory("Ausrüstung");
                break;
            case "handwerk":
            System.out.println(category + " 3");

                question = questionRepository.findRandomByCategory("Handwerk");
                break;
            case "fahrzeuge":
            System.out.println(category + " 4");

                question = questionRepository.findRandomByCategory("Fahrzeuge");
                break;
            case "schläuche":
            System.out.println(category + " 5");

                question = questionRepository.findRandomByCategory("Schläuche");
                break;
            default:
                System.out.println(category + " 6");
                question = questionRepository.findRandomQuestion();
        }

        if (question == null) {
            System.out.println("ERROR: no question found when searching by category or selecting a random one");
            return null;
        }
        QuizDTO quiz = new QuizDTO();
        quiz.setQid(question.getId());
        quiz.setText(question.getText());
        quiz.setCategory(question.getCategory());

        List<Selection> selections = selectionRepository.findByQuestion(question);

        List<Integer> randomListHelper = new LinkedList<>();
        for (int i = 0; i < selections.size(); i++) {
            randomListHelper.add(i);
        }

        Collections.shuffle(randomListHelper);

        List<Selection> newSelections = new LinkedList<>();
        for (Integer index : randomListHelper) {
            boolean insertSuccess = newSelections.add(selections.get(index));
            if (!insertSuccess) {
                System.out.println("ERROR: Selection could not be inserted as part of randomization.");
            }
        }

        String[] s = newSelections.stream()
                .map(Selection::getAnswer)
                .toArray(String[]::new);
        quiz.setSelections(s);

        List<Integer> indexes = new LinkedList<>();
        for (int i = 0; i < newSelections.size(); i++) {
            if (newSelections.get(i).isSolution()) {
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

    public List<String> receiveCategories() {
        return questionRepository.findAllCategories();
    }

    public boolean saveProgress(Integer qid, String sid) {
        User user = userService.receiveUser(sid);
        Question question = questionRepository.findById(qid).orElse(null);

        if (question == null) { // question not found
            return false;
        }

        boolean progressExists = usersAndQuestionsRepository.existsByUserAndQuestion(user, question);
        if (progressExists) { // progress already exists
            return false;
        }

        UsersAndQuestions uq = new UsersAndQuestions();
        uq.setUser(user);
        uq.setQuestion(question);
        usersAndQuestionsRepository.save(uq);
        return true;
    }

    public Integer receiveProgress(String sid) {
        User user = userService.receiveUser(sid);

        if (user == null) {
            return 0;
        }

        long rightAnswers = usersAndQuestionsRepository.countByUser(user);
        long totalQuestions = questionRepository.count();

        if (totalQuestions == 0) {
            return 0; // Avoid division by zero
        }

        return (int) Math.round((rightAnswers * 100.0) / totalQuestions);
    }
}
