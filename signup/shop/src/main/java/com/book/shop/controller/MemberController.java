package com.book.shop.controller;

import com.book.shop.model.MemberRepository;
import com.book.shop.service.MemberService;
import com.book.shop.table.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @GetMapping(value="/main")
    public String main() {
        return "main";
    }

    @GetMapping(value="/{path}")
    public String route(@PathVariable String path) {
        return path;
    }

    @PostMapping(value = "/member/new")
    public String createForm(@RequestParam("id") String id,
                             @RequestParam("name") String name,
                             @RequestParam("pass") String pass,
                             @RequestParam("phone") String phone,
                             @RequestParam("email") String email
                             , Model model) {
        Member member = new Member();
        member.setMember_id(id);
        member.setMember_name(name);
        member.setMember_pass(pass);
        member.setMember_phone(phone);
        member.setMember_email(email);
        memberService.join(member);
        memberRepository.save(member);
        model.addAttribute("member", member);
        return "redirect:/main";
    }

//    @GetMapping("/member/info/{memberId}")
//    public String info(@RequestParam("") Str)
//
}
