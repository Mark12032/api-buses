package com.example.apiBus.controller;

import com.example.apiBus.model.Bus;
import com.example.apiBus.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bus")
public class BusController {
    @Autowired
    private BusService busService;

    @GetMapping
    public Page<Bus> getAll(Pageable pageable) {
        return busService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bus> getById(@PathVariable Long id) {
        return busService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
