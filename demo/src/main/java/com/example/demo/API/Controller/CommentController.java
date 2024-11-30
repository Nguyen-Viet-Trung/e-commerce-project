package com.example.demo.API.Controller;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.demo.API.DTO.CommentDTO;
import com.example.demo.API.Entity.Comment;
import com.example.demo.API.Service.CommentService;

@Controller
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/comments")
    @ResponseBody
    public List<CommentDTO> findAll() {
        return commentService.findAll();
    }
    @GetMapping("/comments/pagination")
    @ResponseBody
    public Page<Comment> getPageComments(Pageable pageable) {
        return commentService.getPageComments(pageable);
    }
    @PostMapping("/comments/save")
    public ResponseEntity<String> save(@RequestBody CommentDTO commentDTO) {
        try {
            commentService.save(commentDTO);
            return ResponseEntity.ok("Comment saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving comment: " + e.getMessage());
        }
    }
    @DeleteMapping("admin/delete_review/{review_id}")
    public ResponseEntity<String> delete(@PathVariable("review_id") String review_id) {
        try {
            commentService.delete(review_id);
            return ResponseEntity.ok("Comment delete successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving comment: " + e.getMessage());
        }
    }
}
