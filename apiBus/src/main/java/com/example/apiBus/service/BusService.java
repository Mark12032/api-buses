package com.example.apiBus.service;

import com.example.apiBus.model.Bus;
import com.example.apiBus.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;

    public Page<Bus> getAll(Pageable pageable) {
        return busRepository.findAll(pageable);
    }

    public Optional<Bus> getById(Long id) {
        return busRepository.findById(id);
    }
}
